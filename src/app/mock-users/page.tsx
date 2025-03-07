import React from 'react'
import { revalidatePath } from 'next/cache';

type MockUser = {
    name: string,
    id: number,
}

const MockUsers = async() => {
    const res = await fetch("https://67a9b66c6e9548e44fc4898f.mockapi.io/users");
    const users = await res.json()

    async function addUser(formData: FormData){
        "use server"
        const name = formData.get("name")
        const res = await fetch("https://67a9b66c6e9548e44fc4898f.mockapi.io/users", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name}),
        }
    );
    const newUser = await res.json();
    revalidatePath("/mock-users")
    console.log(newUser)
    }

  return (
    <div className="py-10">
        <form className="mb-4" action={addUser}>
            <input type="text" name="name" required className="border p-2 mr-2" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
        </form>
        <div className="grid grid-cols-4 gap-4 py-10">
            {users.map((user: MockUser) => (
                <div key={user.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                {user.name}
                </div>
            ))}
        </div>
    </div>
  )
}

export default MockUsers