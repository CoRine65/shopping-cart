//handles showing the cards with the random pokemon image

function Card({name, img, onClick}){
    return (
        <section className="card" onClick={onClick}>
            <img src={img} alt={name} />
            <p>{name}</p>
        </section>
    )
}
export default Card;