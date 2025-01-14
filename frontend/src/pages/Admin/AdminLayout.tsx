
import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import { Outlet } from "react-router";

const AdminLayout: React.FC = () => {
    
    return (
        <div className="w-[1200px] flex flex-col min-h-screen">
            <div className="top-0"> <Navigation /> </div>
            <div className="flex-grow mb-10">
                <Outlet />
            </div>
            <div className="flex-shrink-0">
                <Footer />
            </div>
        </div>
    );
};
  
export default AdminLayout;