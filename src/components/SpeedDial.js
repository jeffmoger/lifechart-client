import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import dramaMasks from '@iconify/icons-mdi/drama-masks';
import scaleBathroom from '@iconify/icons-mdi/scale-bathroom';
import bellSleep from '@iconify/icons-mdi/bell-sleep';
import healthCross from '@iconify/icons-carbon/health-cross';

import DataEntry from './DataEntry';

const DEBUG = false;

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(3),
    zIndex: 3,
  },
  backdrop: {
    zIndex: 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  dialog: {
    zIndex: 2,
  },
}));

const useStylesTooltip = makeStyles((theme) => ({
  tooltip: {
    background: 'transparent',
    fontSize: 16,
  },
}));

const actions = [
  { icon: <Icon icon={healthCross} height={20} />, name: 'Symptom' },
  { icon: <Icon icon={bellSleep} height={20} />, name: 'Sleep' },
  { icon: <Icon icon={scaleBathroom} height={20} />, name: 'Weight' },
  { icon: <Icon icon={dramaMasks} height={20} />, name: 'Mood' },
];

export default function SpeedDialTooltipOpen({
  refreshAfterSubmit,
  authTokens,
  profile,
}) {
  const classes = useStyles();
  const classesTooltip = useStylesTooltip();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogCategory, setDialogCategory] = useState('');

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDialogOpen = (e) => {
    setOpenDialog(true);
    setDialogCategory(e.currentTarget.dataset.category);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (DEBUG) {
      console.log({
        page: 'SpeedDial',
        open,
        openDialog,
        dialogCategory,
      });
    }
  });

  return (
    <div className={classes.root}>
      <Backdrop open={open} className={classes.backdrop}>
        <DataEntry
          open={openDialog}
          className={classes.dialog}
          handleDialogClose={handleDialogClose}
          category={dialogCategory}
          refreshAfterSubmit={refreshAfterSubmit}
          profile={profile}
          authTokens={authTokens}
        />
      </Backdrop>
      <SpeedDial
        ariaLabel="Add new activity"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        //onClose={handleClose}
        //onOpen={handleOpen}
        onClick={toggleOpen}
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
