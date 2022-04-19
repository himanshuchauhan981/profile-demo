class ApiService {
  updateUserDetails = (details) => {
    localStorage.setItem('userDetails', JSON.stringify(details));
  }
}

export default ApiService;