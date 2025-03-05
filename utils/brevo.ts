"use server";

export const addNewContact = async ({ email }: { email: string }) => {
  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      email,
      emailBlacklisted: false,
      smsBlacklisted: false,
      listIds: [7],
      updateEnabled: false,
    }),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);

  return responseData;
};
