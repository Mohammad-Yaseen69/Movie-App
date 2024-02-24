import React from "react";
import useFetch from "../../../hooks/useFetch";
import { Carousel } from "../../../Components";

const Recommendation = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/recommendations`
    );

    return (
        data && data?.results?.length > 0 &&
        <>
            <Carousel
                title="Recommendation"
                data={data?.results}
                loading={loading}
                endpoint={mediaType}
            />
        </>
    );
    
};

export default Recommendation;