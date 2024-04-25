import React from 'react';
import TaskFormCustom from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

const TasksPage = () => {
    return (
        <div className={'max-w-lg'}>
            <TaskFormCustom />
            <TaskList />
        </div>
    );
};

export default TasksPage;