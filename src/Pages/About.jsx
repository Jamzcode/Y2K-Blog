export default function About() {
  return (
    <div className="page-layout">
      <h2>Welcome to TheBlogBook!</h2>
      <h2>About the Authors</h2>
      <div className="flex flex-col items-center border-b-4 pb-4">
        <h3>Ashley "Dr.B" Baladhay, Pharm D.</h3>
        <img src="https://placehold.co/400" />

        <p className="text-center">
          `Dr.B was born in New York and thus likes colder seasons of existence.
          Having moved to South Texas in her developmental years, Ashley
          completed her degrees of nerdy science at the University of Texas at
          Austin, where she gained an affinity for expensive lunches and burn
          orange. Though not dead, Ashley is survived by her two snakes, Leopold
          and Claire, as well as her Darling Black-headed Baby (DBHB) Miso.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h3>Jamzcode</h3>
        <img src="https://placehold.co/400" />

        <p className="text-center">
          Developer and attentive lover (!), Jamzcode enjoys long walks on the
          beaches they visit every decade or so and eating Japanese grocery
          store meals. A native to South Texas, Jamz enjoys sweating in the heat
          and avoiding yard duties for most of the year. Having recently taken
          up swimming in Q2 2026 as a means to ensnatchificate, he has also
          adopted the occasional moniker "Swimboy". He finds it to be fitting
          since that is what he is on the occasion.
        </p>
      </div>
    </div>
  );
}
