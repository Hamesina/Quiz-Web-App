import CustomerReviews from "@/components/frontend/CustomerReviews";
import Hero from "@/components/frontend/Hero";
import Offer from "@/components/frontend/Offer";
import Products from "@/components/frontend/Products";
import Services from "@/components/frontend/Services";
import Subscribe from "@/components/frontend/Subscribe";
import Updates from "@/components/frontend/Updates";

const Home = () => {
  return (
    <main className="relative">
      <section className="xl:padding-1 wide:padding-r padding-b">
        <Hero />
      </section>
      {/*       <section className="padding">
        <Products />
      </section> */}
      {/*    <section className="padding">
       
      </section> */}
      <section className="padding-x py-10">
        {" "}
        <Services />
      </section>
      <section className="padding">
        <Updates />
      </section>
      <section className="padding">
        <Offer />
      </section>
      <section className="padding bg-pale-blue">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-32 py-16 w-full ">
        <Subscribe />
      </section>
    </main>
  );
};
export default Home;
