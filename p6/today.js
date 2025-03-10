module.exports.getDate = function getDate() {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
};
