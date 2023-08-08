// Exported module containing a function for formatting dates
module.exports = {
  // Function to format a date in the MM/DD/YYYY format
  formatDate: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};
