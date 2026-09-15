export default async () => {
  return new Response(
    JSON.stringify({
      status: "OK",
      message: "Upload function is working"
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};