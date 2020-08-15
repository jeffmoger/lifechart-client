import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import medicineBottleFill from '@iconify/icons-ri/medicine-bottle-fill';
import dramaMasks from '@iconify/icons-mdi/drama-masks';
import scaleBathroom from '@iconify/icons-mdi/scale-bathroom';
import DataEntry from './DataEntry';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(3),
    zIndex: 3,
  },
  backdrop: {
    zIndex: 2,
    color: '#fff',
    backgroundColor: 'rgba(20, 20, 20, 0.9)',
  },
  dialog: {
    zIndex: 1,
  },
}));

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: {
    background: 'transparent',
    fontSize: 16,
  },
}));

const actions = [
  { icon: <Icon icon={medicineBottleFill} height={20} />, name: 'Medicine' },
  { icon: <Icon icon={scaleBathroom} height={20} />, name: 'Weight' },
  { icon: <Icon icon={dramaMasks} height={20} />, name: 'Mood' },
];

export default function SpeedDialTooltipOpen() {
  const classes = useStyles();
  const classesTooltip = useStylesTooltip();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogCategory, setDialogCategory] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (e) => {
    setOpenDialog(true);
    setDialogCategory(e.currentTarget.dataset.category);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <Backdrop open={open} className={classes.backdrop} onClick={handleClose}>
        <DataEntry
          open={openDialog}
          className={classes.dialog}
          handleDialogOpen={handleDialogOpen}
          handleDialogClose={handleDialogClose}
          category={dialogCategory}
        />
      </Backdrop>
      <SpeedDial
        ariaLabel="Add new activity"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            data-category={action.name}
            tooltipOpen
            TooltipClasses={classesTooltip}
            tooltipTitle={action.name}
            onClick={handleDialogOpen}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
