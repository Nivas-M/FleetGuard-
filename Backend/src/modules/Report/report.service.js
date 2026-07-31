const supabase =
require("../../Config/db");

const getFleetSummary = async () => {

    const [
        vehicles,
        assignments
    ] = await Promise.all([

        supabase
        .from("vehicles")
        .select(
            "status",
            {
                count:"exact"
            }
        ),

        supabase
        .from("vehicle_assignments")
        .select(
            "status",
            {
                count:"exact"
            }
        )

    ]);

    const vehicleData =
    vehicles.data;

    const assignmentData =
    assignments.data;

    return{

        totalVehicles:
        vehicleData.length,

        activeVehicles:
        vehicleData.filter(
            vehicle=>
            vehicle.status==="Active"
        ).length,

        underService:
        vehicleData.filter(
            vehicle=>
            vehicle.status==="Under Service"
        ).length,

        inactiveVehicles:
        vehicleData.filter(
            vehicle=>
            vehicle.status==="Inactive"
        ).length,

        assignedVehicles:
        assignmentData.filter(
            assignment=>
            assignment.status==="Assigned"
        ).length,

        availableVehicles:
        vehicleData.filter(
            vehicle=>
            vehicle.status==="Active"
        ).length-
        assignmentData.filter(
            assignment=>
            assignment.status==="Assigned"
        ).length

    };

};


const getComplianceReport =
async()=>{

    const today=
    new Date();

    const {data,error}=
    await supabase
    .from("compliance_documents")
    .select(`
        *,
        vehicles(
            registration_number
        )
    `);

    if(error)
        throw new Error(error.message);

    return data.map(doc=>{

        const expiry=
        new Date(doc.expiry_date);

        const days=
        Math.ceil(
            (
                expiry-
                today
            )/
            (
                1000*
                60*
                60*
                24
            )
        );

        return{

            registration_number:
            doc.vehicles.registration_number,

            document_type:
            doc.document_type,

            expiry_date:
            doc.expiry_date,

            daysRemaining:
            days,

            status:
            days<0
            ?"Expired"
            :days<=30
            ?"Expiring"
            :"Valid"

        };

    });

};


const getServiceReport=
async()=>{

    const [
        services,
        due
    ]=
    await Promise.all([

        supabase
        .from("service_logs")
        .select("*"),

        supabase
        .from("service_logs")
        .select("*")
        .lte(
            "next_service_due",
            new Date()
            .toISOString()
            .split("T")[0]
        )

    ]);

    return{

        totalServices:
        services.data.length,

        servicesDue:
        due.data.length,

        totalServiceCost:
        services.data.reduce(

            (
                sum,
                service
            )=>

            sum+
            (
                service.cost||
                0
            ),

            0

        ),

        recentServices:
        services.data
        .sort(
            (
                a,
                b
            )=>

            new Date(
                b.service_date
            )-
            new Date(
                a.service_date
            )
        )
        .slice(0,10)

    };

};


const getAssignmentReport=
async()=>{

    const {data,error}=
    await supabase
    .from("vehicle_assignments")
    .select("status");

    if(error)
        throw new Error(error.message);

    return{

        activeAssignments:
        data.filter(
            assignment=>
            assignment.status==="Assigned"
        ).length,

        completedAssignments:
        data.filter(
            assignment=>
            assignment.status==="Completed"
        ).length,

        cancelledAssignments:
        data.filter(
            assignment=>
            assignment.status==="Cancelled"
        ).length

    };

};


module.exports={

getFleetSummary,

getComplianceReport,

getServiceReport,

getAssignmentReport

};