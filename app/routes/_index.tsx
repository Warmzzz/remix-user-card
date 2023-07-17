import { ActionArgs, V2_MetaFunction, json } from "@remix-run/node";
import { Form, useActionData, Link } from "@remix-run/react";
import { Label, TextInput, Button, Tooltip, Toast, Card } from "flowbite-react";
import { HiExclamation, HiMail, HiLink, HiHome } from "react-icons/hi";
import AvatarPlaceholder from "~/images/avatar-placeholder.png";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "User Card Website" },
    { name: "description", content: "A website made with Remix run" },
    { name: "author", content: "Raffaele Gigantelli" }
  ];
}


export default function Index(){
  const data = useActionData();
  if( (data && data.error) || !data) {
    return(
      <main className="w-full h-full flex flex-col items-center justify-center pt-4">
        <Form method="post" className="flex flex-col gap-4 w-1/4 border-2 border-gray-200 bg-white shadow-md rounded-md p-6" reloadDocument={true}>
  
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="input__email"
              value="Your email"
            />
          </div>
          <TextInput
            id="input__email"
            placeholder="johndoe@example.com"
            name="email"
            required
            type="email"
          />
        </div>
  
        <div>
          <div className="mb-2 block">
              <Label
                htmlFor="input__username"
                value="Your username"
              />
          </div>
          <TextInput 
            id="input__username"
            placeholder="john_doe"
            name="username"
            required
            type="text"
          />
        </div>

        <Button type="submit" className="w-full">
          <Tooltip content="Click here to submit this form !">Send</Tooltip>
        </Button>
  
        </Form>

        {
          data && data.error && (
            <Toast className="mt-4">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                <HiExclamation className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal">
                {data.error}
              </div>
              <Toast.Toggle />
            </Toast>
          )
        }
      </main>
    )
  } else {
    return(
      <main className="w-full h-full flex flex-col items-center justify-center pt-4">

        <Card>

          <div className="flex flex-col items-center pb-10">
            <img
              alt="An avatar placeholder image"
              className="mb-3 rounded-full shadow-lg"
              height="192"
              src={AvatarPlaceholder}
              width="192"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              { data.username }
            </h5>
            <span className="text-sm text-gray-500">
              { data.email }
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Link
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 "
                to={`https://${data.website}`} target="_blank"
              >
                <p>
                  <HiLink /> Visit website
                </p>
              </Link>
              <Link
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
                to={`mailto:${data.email}`} target="_blank"
              >
                <p>
                  <HiMail /> Send mail
                </p>
              </Link>
            </div>
          </div>
        </Card>

        <Link to="/" reloadDocument={true} className="mt-8 flex flex-row items-center gap-2 hover:text-cyan-700 hover:underline">
          <HiHome />
          <span>Back to homepage</span>
        </Link>

      </main>
    )
  }
} 

export async function action({ request }: ActionArgs){
  const data = await request.formData();
  
  const email = data.get("email")?.toString();
  const username = data.get("username")?.toString();

  if(!email || !username) {
    return json({
      error: "Email and username are required",
      status: 400,
    });
  }

  if(!username.trim() || username.length < 5){
    return json({
      error: "Please provide a valid username with minimum 5 characters",
      status: 400,
    });
  }

  if(!validateEmail(email)){
    return json({
      error: "Please provide a valid email",
      status: 400,
    });
  }

  const userWebsite = email.split("@")[1];

  return json({
    email,
    username,
    website: userWebsite,
  });
}

const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
