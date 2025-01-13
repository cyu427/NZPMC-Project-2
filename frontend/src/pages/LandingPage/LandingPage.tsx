import Hero from "../../components/hero/Hero";
import Navigation from "../../components/navigation/Navigation";

const LandingPage: React.FC = () => {
    return (
        <div className="w-[1200px] h-screen">
            <div className="top-0">
                <Navigation />
            </div>
            <Hero />
        </div>
    );
};
  
export default LandingPage;