
import Footer from "../../components/footer/Footer";
import AdminEventsSection from "../../components/admin/events/AdminEventsSection";
import Navigation from "../../components/navigation/Navigation";

const AdminEventPage: React.FC = () => {
    
    return (
        <div className="w-[1200px] flex flex-col min-h-screen">
            <div className="top-0"> <Navigation /> </div>
            <div className="flex-grow">
                <AdminEventsSection />
            </div>
            <div className="flex-shrink-0">
                <Footer />
            </div>
        </div>
    );
};
  
export default AdminEventPage;