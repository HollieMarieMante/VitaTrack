export const useGetUserInfo = () => {
    const authData = localStorage.getItem("auth");
    
    if (authData) {
        const { name, profilePhoto, userID, isAuth } = JSON.parse(authData);
        return { name, profilePhoto, userID, isAuth };
    } else {
        // Return default values or undefined when there's no auth data in localStorage
        return { name: undefined, profilePhoto: undefined, userID: undefined, isAuth: undefined };
    }
}
