import { Button, Dialog, Tab, Tabs, Typography } from "@mui/material";
import { useParams } from "react-router";
import { useGetCompetition } from "../../../services/competition/useGetCompetition";
import { useEffect, useRef, useState } from "react";
import QuestionType from "../../../components/admin/questions/ViewQuestion/QuestionType";
import QuestionCard from "../../../components/admin/competition/ViewCompetition/QuestionCard";
import AddQuestionToCompetitionDialog from "../../../components/admin/competition/AddQuestionToCompetition/AddQuestionToCompetitionDialog";
import AddCompetitionToEventDialog from "../../../components/admin/competition/AddCompetitionToEvent/AddCompetitionToEventDialog";

const AdminViewCompetitionPage: React.FC = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);

    const { data: competitionData, error: isCompetitionError, isLoading: isGetCompetitionLoading, refetch: refetchCompetition } = useGetCompetition(id!);
    const tabPanelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [addQuestionToCompetitionDialogOpen, setAddQuestionToCompetitionDialogOpen] = useState(false);
    const handleAddQuestionToCompetition = () => {setAddQuestionToCompetitionDialogOpen(true);}
    const handleCloseAddQuestionToCompetitionDialog = () => {setAddQuestionToCompetitionDialogOpen(false);}

    const [addCompetitionToEventDialogOpen, setAddCompetitionToEventDialogOpen] = useState(false);
    const handleAddCompetitionToEvent = () => {setAddCompetitionToEventDialogOpen(true);}
    const handleCloseAddCompetitionToEventDialog = () => {setAddCompetitionToEventDialogOpen(false);}

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 210; // Adjust offset for tab height or margin
            let newActiveTab = activeTab;

            tabPanelRefs.current.forEach((panel, index) => {
                if (panel) {
                    const { offsetTop, offsetHeight } = panel;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        newActiveTab = index;
                    }
                }
            });

            if (newActiveTab !== activeTab) {
                setActiveTab(newActiveTab);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeTab]);

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

    return (
        <>
            <div className="items-center my-4">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {competitionData.title}
                </Typography>
            </div>
            <div className="justify-items-center mb-5">
                <Button variant="contained" color="success" fullWidth onClick={handleAddCompetitionToEvent} >
                    Add/Remove Competition To Event
                </Button>
            </div>
            <div className="justify-items-center mb-5">
                <Button variant="contained" color="primary" fullWidth onClick={handleAddQuestionToCompetition} >
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

            <Dialog open={addQuestionToCompetitionDialogOpen} onClose={handleCloseAddQuestionToCompetitionDialog} fullWidth maxWidth="md">
                <AddQuestionToCompetitionDialog onClose={handleCloseAddQuestionToCompetitionDialog} refetchCompetition={refetchCompetition} competitionId={ id! } /> 
            </Dialog>

            <Dialog open={addCompetitionToEventDialogOpen} onClose={handleCloseAddCompetitionToEventDialog} fullWidth maxWidth="md">
                <AddCompetitionToEventDialog onClose={handleCloseAddCompetitionToEventDialog} competitionId={ id! } /> 
            </Dialog>
        </>
    );
};

export default AdminViewCompetitionPage;