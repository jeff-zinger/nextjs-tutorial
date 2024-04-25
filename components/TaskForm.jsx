'use client'
import React, {useEffect} from 'react';
import {createTask} from "@/utils/actions";
import {useFormStatus, useFormState} from "react-dom"
import toast from "react-hot-toast";

const SubmitButton = () => {
    const {pending} = useFormStatus()
    return (
        <button type={"submit"} className={"btn btn-primary join-item"} disabled={pending}>
            {pending ? "please wait..." : "create task"}
        </button>
    )
}

const initialState = {
    message: null
}

const TaskForm = () => {
    const [state, formAction] = useFormState(createTask, initialState)
    useEffect(() => {
        if (state.message === "error...") {
            toast.error("There be an error!")
            return
        }
        if (state.message) {
            toast.success("Task be created!")
        }
    },[state])
    return (
        <form action={formAction}>
            <div className={"join w-full"}>
                <input type="text" className={"input input-bordered join-item w-full"} placeholder={"type here"} name={"content"} required/>
                <SubmitButton />
            </div>
        </form>
    );
};

export default TaskForm;