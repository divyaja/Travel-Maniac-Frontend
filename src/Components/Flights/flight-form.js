// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import SearchInput from "../Common/searchbar";
// import Button from "../Common/button";
// import "./flight-form.css";
// import DatePickerTravel from "../Common/date-picker";
// import SelectDropdown from "../Common/dropdown";

// class FlightForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       top100Films: [
//         { label: "The Shawshank Redemption", year: 1994 },
//         { label: "The Godfather", year: 1972 },
//         { label: "The Godfather: Part II", year: 1974 },
//         { label: "The Dark Knight", year: 2008 },
//         { label: "12 Angry Men", year: 1957 },
//         { label: "Schindler's List", year: 1993 },
//         { label: "Pulp Fiction", year: 1994 },
//         { label: "Monty Python and the Holy Grail", year: 1975 },
//       ],
//       passengers: [1, 2, 3, 4, 5],
//       value: null,
//     };
//   }


//   render() {
//     return (
//       <div>
//         <div className="mt-2">
//           <SearchInput
//             input={this.state.top100Films}
//             label="Source"
//             className="mt-2"
//           />
//         </div>
//         <div className="mt-2">
//           <SearchInput
//             input={this.state.top100Films}
//             label="Destination"
//             className="mt-2"
//           />
//         </div>
//         <div className="mt-2">
//           <DatePickerTravel
//             value={this.state.value}
//             label="Departure Date"
//             className="mt-2"
//           />
//         </div>
//         <div className="mt-2">
//           <SelectDropdown
//             label="No of travellers"
//             value={this.state.passengers}
//             onPassengersChange={this.props.onPassengersChange}
//           />
//         </div>
//         <Button
//           onSearchFilterList={this.props.onSearchFilterList}
//           btname="Search Flights"
//         />
//       </div>
//     );
//   }
// }

// FlightForm.propTypes = {};

// export default FlightForm;
