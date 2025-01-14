import { Box, Button, styled, Typography } from "@mui/material";
import { useGetStudent } from "../../services/student/useGetStudent";
import useAuth from "../../states/auth/useAuth";

const HighlightedText = styled('span')({
    color: '#FFD700',
})

const ProfileRow = styled(Box)({
    display: 'flex',
    marginBottom: '8px',
  });
  
  const ProfileLabel = styled(Typography)({
    color: '#fff',
    fontWeight: 'bold',
    width: '140px',
    flexShrink: 0,
    textAlign: 'left',
  });
  
  const ProfileValue = styled(Typography)({
    color: '#fff',
    flexGrow: 1,
    textAlign: 'left',
  });

const UserProfileCard: React.FC = () => {
    const { userId } = useAuth();
    const { data: userData, isLoading, error } = useGetStudent(userId!);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }
    
    if (error) {
        return <h2>Error loading user details.</h2>;
    }
    
    if (!userData) {
        return <h2>No user data available.</h2>;
    }

    return (
        <>
            <div className="w-[1200px] h-[400px] bg-dark-blue flex flex-col items-center justify-center" >
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                    Welcome <HighlightedText>{userData.firstName}</HighlightedText>
                </Typography>

                <div className="rounded-lg p-4 w-[400px] h-[295px] border-2 border-white flex flex-col">
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2, fontWeight: 'bold' }}>
                        User Profile
                    </Typography>

                    <div className="flex flex-col justify-between flex-grow">
                        <div>
                            <ProfileRow>
                                <ProfileLabel>First Name:</ProfileLabel>
                                <ProfileValue>{userData.firstName}</ProfileValue>
                            </ProfileRow>

                            <ProfileRow>
                                <ProfileLabel>Last Name:</ProfileLabel>
                                <ProfileValue>{userData.lastName}</ProfileValue>
                            </ProfileRow>

                            <ProfileRow>
                                <ProfileLabel>Email:</ProfileLabel>
                                <ProfileValue>{userData.email}</ProfileValue>
                            </ProfileRow>

                            <ProfileRow>
                                <ProfileLabel>Home Schooled:</ProfileLabel>
                                <ProfileValue>{userData.isHomeSchooled ? 'Yes' : 'No'}</ProfileValue>
                            </ProfileRow>

                            <ProfileRow>
                                <ProfileLabel>School:</ProfileLabel>
                                <ProfileValue>{userData.school}</ProfileValue>
                            </ProfileRow>

                            <div className="flex justify-end mt-4">
                                <Button variant="contained" color="primary">
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
        </>
    );
};

export default UserProfileCard;