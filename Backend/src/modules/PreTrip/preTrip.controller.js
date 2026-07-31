const service =
require("./preTrip.service");

const {
success,
error
}=require("../../Utils/apiResponse");

const getAllInspections=async(req,res)=>{

    try{

        const data=
        await service.getAllInspections();

        return success(
            res,
            "Inspections fetched.",
            data
        );

    }catch(err){

        return error(
            res,
            err.message
        );

    }

};

const getFailedInspections=async(req,res)=>{

    try{

        const data=
        await service.getFailedInspections();

        return success(
            res,
            "Failed inspections fetched.",
            data
        );

    }catch(err){

        return error(
            res,
            err.message
        );

    }

};

const getInspectionById=async(req,res)=>{

    try{

        const data=
        await service.getInspectionById(
            req.params.inspectionId
        );

        return success(
            res,
            "Inspection fetched.",
            data
        );

    }catch(err){

        return error(
            res,
            err.message
        );

    }

};

module.exports={

getAllInspections,

getFailedInspections,

getInspectionById

};