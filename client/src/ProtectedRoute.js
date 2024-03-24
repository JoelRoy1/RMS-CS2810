import { Navigate, Outlet } from 'react-router-dom';

const ProtectdRoute = () => {
    let auth = sessionStorage.getItem('valid_user');
    //revalidate contents of session storage
    if (auth == null || auth == 'false') {
        auth = false;
    } else {
        auth = true;
    }
    return (
        auth ? <Outlet/> : <Navigate to = "/staff-login"/>
    )
};

export default ProtectdRoute;