import Navigation from "../../components/navigation/Navigation";

const LandingPage: React.FC = () => {
    return (
        <div className="w-[1200px] h-screen">
            <div className="sticky top-0">
                <Navigation />
            </div>
        </div>
    );
};
  
export default LandingPage;