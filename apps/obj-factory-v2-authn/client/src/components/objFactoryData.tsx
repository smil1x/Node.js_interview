import React from "react";

export const ObjFactoryData = ({ data }) => {
    return data.map(({id, description}, index) => {
        return  <>
            <p> Object: {index}</p>
            <p> object id: {id}</p>
            <p> object description: {description}</p>
        </>
    })
};