import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import $ from "jquery";
import { useEffect, useState } from "react";
import "./App.css";
import { axiosService, Movie } from "./axios.service";
import { apiUrl } from "./config";

function App() {
    const [addMovie, setAddMovie] = useState({ genre: "", name: "", year: "" });
    const [updateMovie, setUpdateMovie] = useState<Movie>({ genre: "", name: "", year: 1990 });
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        getAllMovies();
    }, []);

    const addMovieHandler = () => {
        axiosService.post(`${apiUrl}/movie`, { ...addMovie, year: Number(addMovie.year) }).then((response) => {
            if (response.status === 201 && response.data) {
                setMovies([...movies, response.data.result]);
                $("#addMovieModal").hide();
                $(".modal-backdrop").remove();
            }
        });
    };

    const getAllMovies = () => {
        axiosService.get(`${apiUrl}/movie/all`).then((response) => {
            if (response.status === 200 && response.data) setMovies([...response.data.result]);
        });
    };

    const handleDelete = (id: string) => {
        axiosService.delete(`${apiUrl}/movie/${id}`).then((response) => {
            if (response.status === 200 && response.data.success) setMovies([...movies.filter((m) => m._id !== id)]);
        });
    };

    const handleMovieUpdate = () => {
        console.info(1, updateMovie);
        axiosService.patch(`${apiUrl}/movie`, { ...updateMovie, id: updateMovie._id }).then((response) => {
            if (response.status === 200 && response.data) {
                const target = movies.filter((m) => m._id === updateMovie._id)[0];
                const index = movies.indexOf(target);
                movies[index] = response.data.result;
                setMovies([...movies]);
                $("#updateModal").hide();
                $(".modal-backdrop").remove();
            }
        });
    };

    const setUpdateModalInputs = (movie: Movie) => {
        setUpdateMovie({ ...movie });
    };

    const getDetail = (id: string) => {
        axiosService.get(`${apiUrl}/movie/${id}`).then((response) => {
            if (response.status === 200 && response.data.success) {
                const movie = response.data.result;
                $(".detailer").html(`
                Id: ${movie._id} <br/>
                Name: ${movie.name} <br/>
                Genre: ${movie.genre} <br/>
                Year: ${movie.year}`);
            }
        });
    };

    return (
        <>
            <div className="App pt-5 text-start">
                <h1 className="text-center">Movies Api</h1>
                <div className="container my-5 text-end">
                    <button
                        className="btn btn-primary btn-xl"
                        data-bs-toggle="modal"
                        data-bs-target="#addMovieModal"
                        onClick={() => setAddMovie({ genre: "", name: "", year: "" })}
                    >
                        Add movie
                    </button>
                </div>
                <div className="container">
                    <h4 className="text-start fw-bold">Movie List</h4>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Year</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.length > 0 ? (
                                movies.map((m, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{m.name}</td>
                                        <td>{m.genre}</td>
                                        <td>{m.year}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(m._id!)}>
                                                Delete
                                            </button>
                                            <button
                                                className="btn btn-primary mx-3"
                                                onClick={() => setUpdateModalInputs(m)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#updateModal"
                                            >
                                                Update
                                            </button>
                                            <button className="btn btn-info" onClick={() => getDetail(m._id!)}>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                    <span className="mt-3 text-success detailer"></span>
                </div>
            </div>

            <div
                className="modal fade"
                id="addMovieModal"
                tabIndex={-1}
                aria-labelledby="addMovieModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addMovieModalLabel">
                                Add movie
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={addMovie.name}
                                        onChange={(e) => {
                                            addMovie.name = e.target.value;
                                            setAddMovie({ ...addMovie });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genre" className="col-form-label">
                                        Genre:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="genre"
                                        value={addMovie.genre}
                                        onChange={(e) => {
                                            addMovie.genre = e.currentTarget.value;
                                            setAddMovie({ ...addMovie });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="year" className="col-form-label">
                                        Year:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        value={addMovie.year}
                                        onChange={(e) => {
                                            addMovie.year = e.currentTarget.value;
                                            setAddMovie({ ...addMovie });
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => addMovieHandler()}>
                                Add movie
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                id="updateModal"
                tabIndex={-1}
                aria-labelledby="updateModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateModalLabel">
                                Update movie
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={updateMovie.name}
                                        onChange={(e) => {
                                            updateMovie.name = e.target.value;
                                            setUpdateMovie({ ...updateMovie });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="genre" className="col-form-label">
                                        Genre:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="genre"
                                        value={updateMovie.genre}
                                        onChange={(e) => {
                                            updateMovie.genre = e.currentTarget.value;
                                            setUpdateMovie({ ...updateMovie });
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="year" className="col-form-label">
                                        Year:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="year"
                                        value={updateMovie.year}
                                        onChange={(e) => {
                                            updateMovie.year = Number(e.currentTarget.value);
                                            setUpdateMovie({ ...updateMovie });
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => handleMovieUpdate()}>
                                Update movie
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
