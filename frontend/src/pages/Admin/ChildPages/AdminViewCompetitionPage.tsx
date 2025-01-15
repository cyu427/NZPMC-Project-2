import { Button, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetCompetition } from "../../../services/competition/useGetCompetition";
import { useEffect, useRef, useState } from "react";
import QuestionType from "../../../components/admin/questions/ViewQuestion/QuestionType";
import QuestionCard from "../../../components/admin/competition/ViewCompetition/QuestionCard";

const AdminViewCompetitionPage: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);

    const { data: competitionData, error: isCompetitionError, isLoading: isGetCompetitionLoading } = useGetCompetition(id!);
    const tabPanelRefs = useRef<(HTMLDivElement | null)[]>([]);

    if (isGetCompetitionLoading) {
        return <div>Loading...</div>;
    }

    if (isCompetitionError) {
        return <div>Error...</div>;
    }

    const handleScrollToPanel = (index: number) => {
        const panel = tabPanelRefs.current[index];
        if (panel) {
            const tabHeight = 200; // Adjust this value if your tabs have a different height
            const offsetTop = panel.offsetTop - tabHeight; // Adjust the offset to take into account the tab height
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth",
            });
            setActiveTab(index); // Update the active tab when clicked
        }
    };

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //       (entries) => {
    //         entries.forEach((entry) => {
    //           if (entry.isIntersecting) {
    //             const index = tabPanelRefs.current.findIndex(
    //               (ref) => ref === entry.target
    //             );
    //             if (index !== -1) {
    //               setActiveTab(index); // Update the active tab when scrolling
    //             }
    //           }
    //         });
    //       },
    //       { threshold: 1 } // Adjust the threshold to your preference
    //     );
      
    //     tabPanelRefs.current.forEach((ref) => {
    //       if (ref) observer.observe(ref);
    //     });
      
    //     return () => {
    //       observer.disconnect();
    //     };
    // }, []);

    return (
        <>
            <div className="items-center my-4">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {competitionData.title}
                </Typography>
            </div>
            <div className="justify-items-center mb-5">
                <Button variant="contained" color="primary" fullWidth >
                    Add Question
                </Button>
            </div>
            <div className="flex flex-row w-[920px] items-start mb-5">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    aria-label="Vertical tabs"
                    value={activeTab}
                    sx={{
                        borderRight: 1,
                        borderColor: "divider",
                        minWidth: "200px",
                        position: "sticky",
                        top: 0,
                        maxHeight: "60vh",
                        overflowY: "auto",
                    }}
                >
                    {competitionData.question.map((question: QuestionType, index: number) => (
                        <Tab key={question.id} label={`Question ${index + 1}`} onClick={() => handleScrollToPanel(index)} />
                    ))}
                </Tabs>

                <div className="flex-1 ml-5">
                    {competitionData.question.map((question: QuestionType, index: number) => (
                        <div key={question.id} ref={(el) => (tabPanelRefs.current[index] = el)} className="mb-5">
                            <QuestionCard questionId={question.id!} question={question} index={index + 1} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mb-5 mt-5">
                <Button variant="outlined" color="error" fullWidth>
                    Delete Competition
                </Button>
            </div>
        </>
    );
};

export default AdminViewCompetitionPage;