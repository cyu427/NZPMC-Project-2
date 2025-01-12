import Navigation from "../../components/navigation/Navigation";

const LandingPage: React.FC = () => {
    return (
        <div style={{width: '1200px', height: '100vh'}}>
            <div style={{position: 'sticky', top: 0}}>
                <Navigation />
            </div>
            
        </div>
    );
};
  
export default LandingPage;