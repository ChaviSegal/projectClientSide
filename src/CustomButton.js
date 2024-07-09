import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';

const CustomButton = ({ imageUrl, linkTo, buttonText }) => {
  return (
    <Button component={Link} to={linkTo} style={{textTransform: 'none'}}>
      <ListItem button>
        <img src={imageUrl} alt="icon" className="icon" />
        <span className="link">{buttonText}</span>
      </ListItem>
    </Button>
  );
};

export default CustomButton;
