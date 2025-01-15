import { Button, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import QuestionType from "../../components/admin/questions/ViewQuestion/QuestionType";
import QuestionCard from "../../components/admin/competition/ViewCompetition/QuestionCard";
import { useGetCompetition } from "../../services/competition/useGetCompetition";
import { useAttempt } from "../../states/attempt/useAttempt";
import { useSubmitAttempt } from "../../services/attempt/useSubmitAttempt";
import useAuth from "../../states/auth/useAuth";

const AttemptPage: React.FC = () => {
    
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const { answers, clearAnswers } = useAttempt();
    const navigate = useNavigate();
    const { userId } = useAuth();

    const { data: competitionData, error: isCompetitionError, isLoading: isGetCompetitionLoading } = useGetCompetition(id!);
    const { mutate: submitAttempt } = useSubmitAttempt();
    const tabPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
    
    //const navigate = useNavigate();

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

    const handleSubmitAttempt = () => {
        submitAttempt({ userId: userId!, competitionId: id!, attempt: answers }, {
            onSuccess: () => {
                console.log("Attempt submitted successfully");
                clearAnswers();
            },
            onError: (error) => {
                console.error("Error submitting attempt", error);
            },
        });
        navigate('/signed-in');
    }
    

    return (
        <>
            <div className="items-center my-4">
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {competitionData.title}
                </Typography>
            </div>
            {/* Conditionally Render the Question Section */}
            {competitionData.question.length > 0 ? (
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
            ) : (
                <Typography variant="h6" sx={{ fontStyle: "italic", color: "gray" }}>
                    No questions available for this competition.
                </Typography>
            )}
            <div className="mb-5 mt-5">
                <Button variant="contained" fullWidth onClick={handleSubmitAttempt}>
                    Submit Competition
                </Button>
            </div>
        </>
    );
};

export default AttemptPage;