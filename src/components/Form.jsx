import React, { useState } from "react";
import Swal from 'sweetalert2';

export default function UserForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
	});
	const handleFormChange = (e) => {
		let newFormData = { ...formData };
		newFormData[e.target.name] = e.target.value;
		setFormData(newFormData);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		async function createUser() {
			let result = await fetch(
				"https://60efff36f587af00179d3c01.mockapi.io/persons",
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: {
						"Content-type": "application/json",
					},
				},
			);
			console.log(result);
            Swal.fire(
                'User created Successfully'

            )
		}
		createUser();
	};

	return (
		<div className="user-form border p-4 mt-5 rounded shadow-sm">
			<form onSubmit={handleFormSubmit} onChange={handleFormChange} action="">
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						Name
					</label>
					<input
						name="name"
						type="text"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder="Name"
					/>
				</div>
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						Email
					</label>
					<input
						name="email"
						type="email"
						className="form-control"
						id="exampleFormControlInput1"
						placeholder=""
					/>
				</div>
				<div className="mb-3">
					<label for="exampleFormControlInput1" className="form-label">
						age
					</label>
					<input
						name="age"
						type="number"
						className="form-control"
						id="exampleFormControlInput1"
					/>
				</div>
				<button type="submit" className="btn btn-dark">
					Submit
				</button>
			</form>
		</div>
	);
}
