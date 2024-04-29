import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    TableRow,
    TableBody,
    // TableCell,
} from '@mui/material'

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)",
    }),
});

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const DraggableComponent = (id, index) => (props) => {
    return (
        <Draggable key={id} draggableId={id.toString()} index={index}>
            {(provided, snapshot) => (
                <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    {...props}
                >
                    {props.children}
                </TableRow>
            )}
        </Draggable>
    );
};

export const DroppableComponent = (onDragEnd) => (props) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"1"} direction="vertical">
                {(provided) => {
                    return (
                        <TableBody
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...props}
                        >
                            {props.children}
                            {provided.placeholder}
                        </TableBody>
                    );
                }}
            </Droppable>
        </DragDropContext>
    );
};

