const {
    getServiceQueue
} = require("./queueService");

const {
    getRecentServices
} = require("./recentServiceService");

async function getDashboard() {

    const queue =
        await getServiceQueue();

    const recentServices =
        await getRecentServices();

    const stats = {

        totalInQueue:
            queue.length,

        overdue:
            queue.filter(q => q.overdue).length,

        dueToday:
            queue.filter(q => {

                return (
                    q.dueMileage -
                    q.mileage
                ) <= 0;

            }).length,

        highRisk:
            queue.filter(q =>
                q.priority === "High"
            ).length

    };

    return {

        stats,

        queue,

        recentServices

    };

}

module.exports = {
    getDashboard
};