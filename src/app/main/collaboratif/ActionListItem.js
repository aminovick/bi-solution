import React from 'react';
import {IconButton, Icon, Typography, Checkbox, ListItem} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import _ from '@lodash';
import * as Actions from './store/actions';
import ActionChip from './ActionChip';
export const TOGGLE_COMPLETED = '[ACTION APP] TOGGLE COMPLETED';

const useStyles = makeStyles({
    actionItem: {
        '&.completed': {
            background                    : 'rgba(0,0,0,0.03)',
            '& .action-title, & .action-notes': {
                textDecoration: 'line-through'
            }
        }
    }
});

function ActionListItem(props)
{
    const dispatch = useDispatch();
    const labels = useSelector(({actionApp}) => actionApp.labels);

    const classes = useStyles(props);

    return (
        <ListItem
            className={clsx(classes.actionItem, {"completed": props.action.completed}, "border-solid border-b-1 py-16  px-0 sm:px-8")}
            onClick={(ev) => {
                ev.preventDefault();
                dispatch(Actions.openEditActionDialog(props.action));
            }}
            dense
            button
        >

            <Checkbox
                tabIndex={-1}
                disableRipple
                checked={props.action.completed}
                onChange={() => dispatch(Actions.toggleCompleted(props.action))}
                onClick={(ev) => ev.stopPropagation()}
            />

            <div className="flex flex-1 flex-col relative overflow-hidden pl-8">

                <Typography
                    variant="subtitle1"
                    className="action-title truncate"
                    color={props.action.completed ? "textSecondary" : "inherit"}
                >
                     {props.action.titre}<div style={{textAlign:'right'}}>Responsable : {props.action.selectedResponsable}</div>
                </Typography>

                <Typography
                    color="textSecondary"
                    className="action-notes truncate"
                >
                    {_.truncate(props.action.notes.replace(/<(?:.|\n)*?>/gm, ''), {'length': 180})}
                </Typography>

                <div className={clsx(classes.labels, "flex mt-8")}>
                    {props.action.labels.map(label => (
                        <ActionChip
                            className="mr-4"
                            title={_.find(labels, {id: label}).title}
                            color={_.find(labels, {id: label}).color}
                            key={label}
                        />
                    ))}
                </div>
            </div>

            <div className="px-8">
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    dispatch(Actions.toggleImportant(props.action))
                }}>
                    {props.action.important ? (
                        <Icon style={{color: red[500]}}>error</Icon>
                    ) : (
                        <Icon>error_outline</Icon>
                    )}
                </IconButton>
                <IconButton onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                   dispatch(Actions.toggleStarred(props.action))
                }}>
                    {props.action.starred ? (
                        <Icon style={{color: amber[500]}}>star</Icon>
                    ) : (
                        <Icon>star_outline</Icon>
                    )}
                </IconButton>
            </div>
        </ListItem>
    );
}

export default ActionListItem;
