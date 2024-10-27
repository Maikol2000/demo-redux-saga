import React from "react";

// root api
function api<T, V = void>(query: string, variables?: V) {
  const requestBody = JSON.stringify({ query, variables: variables ?? {} });
  return fetch("https://eshopapi.s500.vn/graphql", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: requestBody,
  }).then((resp) => resp.json() as T);
}

interface Resp<T> {
  data: T;
}

interface ProvincesResp {
  provinces: Provinces[];
}

interface Provinces {
  _id: string;
  code: string;
  name: string;
}

// Variable to request option
interface Variables {
  index: number;
}

const QUERY = {
  getProvinces: async () => {
    return await api<Resp<ProvincesResp>, Variables>(
      `query ExampleQuery {
            provinces {
                _id
                code
                name
            }
        }`
    );
  },
};

export default async function page() {
  const getProvinces = await QUERY.getProvinces().then(
    (rsp) => rsp.data.provinces
  );

  return (
    <div>
      {getProvinces.map((prov, idx) => (
        <div key={idx}>{prov.name}</div>
      ))}
    </div>
  );
}
