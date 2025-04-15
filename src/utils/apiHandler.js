export default  async function getAPiresponse(url, method, headers, body) {
  let response = await (
    await fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
  ).json();

  return response;
}
