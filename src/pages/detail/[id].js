import Detail from "pages/detail/index.js";
import withAuthentication from "hoc/AuthCheck";
import axios from "axios";

const Index = (props) => {
  return <Detail {...props} />;
};

export const getServerSideProps = async (ctx) => {
    const props = await withAuthentication.AuthCheck(3, ctx);
    try{
        const response = await axios.get(`/rest/product/element/${ctx.query.id}`);
        const detail = await axios.get(`/rest/product/${ctx.query.id}`);
        props.detailData = detail.data
        props.initialData = response.data;
    }
    catch(e){
        if(e.response.status >= 500){
        console.error(e);
        }
    }

    return {
        props,
    };
};
export default withAuthentication(Index);
