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

export const sendEmail = async ({ email }: { email: string }) => {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: { email: "info@simicdev.com", name: "Jimmy" },
      to: [{ name: "ResumeAnalyzer", email: "simadurlan92@gmail.com" }],
      params: { FNAME: "Joe", DJOLE: "Kralj" },
      templateId: 11,
    }),
  });

  const responseData = await response.json();
  console.log("responseData", responseData);

  return responseData;
};
