
export const getSession = async() => {
    await new Promise((resolve) => setTimeout(resolve , 1000));
    
    return {
        userName: "Saiful",
        email: "Saiful@gmail.com",
        role: "admin"
    }
}