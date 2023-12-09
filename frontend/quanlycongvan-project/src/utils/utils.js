//Kiểm tra role để hiện thỉ giao diện
export const isUserAllow = () => {
    let role = localStorage.getItem("role")
    if (role === "user") {
        return true
    }
    return false
};

