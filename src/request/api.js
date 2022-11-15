import apserviceAxiosi from './http';
const getFirest = (params) => {
    return apserviceAxiosi({
        method: 'get',
        url: '/first',
        params
    });
}
// post发取表单的格式请求
const postLogin = (data) => {
 return apserviceAxiosi({
    method: 'post',
    url: '/login',
    data
 });
}
export {
    getFirest,
    postLogin
};
