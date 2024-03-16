const useFetchapi = (baseURL, headers) => {
  const createFetchInstance = (route, requestMethod, data) => {
    const tempReq = new Request(`${baseURL}${route}`, {
      method: requestMethod,
      headers,
      data: data || null
    });
    return [fetch, tempReq];
  };

  return createFetchInstance;
};

export default useFetchapi;




