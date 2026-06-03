import Stripe from "./ProfileSection/Stripe";

export default function CompanyPage({

 

  params,
}: {
  params: { companyId: string };
}) {
  return (
    <main className="flex">
     <Stripe />
    </main>
  );
}
