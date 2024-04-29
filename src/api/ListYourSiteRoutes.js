import  Api  from "../utils/ApiRequest";

const ListYourSiteRoutes = {
    AddListYourSite: async(data) =>{
        return await Api.post(`add-list-your-site`,data,{
            headers: {
                "Content-Type": "application/json",
              },
        })
    }
}


export default ListYourSiteRoutes;