import React from "react";
import PageContent from "../components/PageContent";
import NewsletterSignup from "../components/NewsletterSignup";

const Newsletter = () => {
  return (
    <PageContent>
      <h2> Join our awesome newsletter! </h2>
      <NewsletterSignup />
    </PageContent>
  );
};

export default Newsletter;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  console.log(email);
  return { message: "Successfully signed up for newsletter" };
};
