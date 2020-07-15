import React from 'react';

export default function Intro() {
  return (
    <main>
      <h3>Why are you building this site?</h3>

      <p>
        I hate going to the doctor. My wife will attest to the many excellent
        and sensible reasons I have at the ready for not wanting to bother a
        doctor with my health issues, but I've come up with a new one that I
        like a lot, and is at the heart of what I'm trying to build here.
      </p>

      <p>
        When I try to explain my symptoms to the doctor, I'm usually acutely
        aware that the details I’m bringing to the table are altogether vague.
        Subjective. I dislike that. The last time my wife forced me to describe
        my complaints to our family doctor, I knew in the moment of describing
        them that there was almost certainly nothing wrong that a better regimen
        of exercise and/or diet wouldn’t fix. As it happened the doctor didn’t
        ask about diet or exercise, which frankly seemed negligent to me, but I
        resolved anyway not to return without a detailed accounting of exactly
        what my diet and exercise patterns look like over time.
      </p>

      <p>
        I imagined a chart plotting six months of exercise, nutrition, sleep,
        and any other input or output I could sensibly measure, and overlaying
        that with a precise accounting of frequency and intensity of symptoms.
        Such a document might reveal obvious patterns to assist in diagnosis. Or
        it might not. In which case, a visit to the doctor would probably be
        warranted.
      </p>

      <h3>How will it work?</h3>

      <p>
        It’s not that difficult to capture and record all manner of health data,
        but at the moment it is not really possible to get all your data into a
        single place where it can be made more useful. One needs a separate app
        for diet, another for fitness, and another for sleep to track this
        information, and there is no convenient way at present to pull this
        information all together into the kind of unified view that would allow
        for patterns and insights to emerge.
      </p>

      <p>
        LifeChart aims to be a service that takes the personal fitness and life
        data that you collect through wearables and nutrition tracking apps and
        consolidates it to form a baseline of health metrics upon which you can
        overlay additional subjective information about how you feel. The idea
        is to give you a more complete picture of how all your outputs
        (activities) and inputs (nutrition) may be affecting your overall well
        being.
      </p>

      <p>
        I started this project near the beginning of Covid, and quickly came to
        realize something interesting, but not all that surprising. As I became
        diligent in recording my data (fitness and nutrition), I tended to eat
        less junk, and I did more exercise. I lost 8 kilograms and most of my
        symptoms have vanished.
      </p>

      <h3>What’s next?</h3>

      <p>
        LifeChart uses Google’s Fit api to tap into fitness activity tracked
        through sensors, and nutrition data entered via third party nutrition
        apps. This is still a pre-prototype project, but I am ready for a half
        dozen or so user testers. If you're reading this now, it's probably
        because I gave you the link and you agreed to come check it out. Thanks
        for that! If you are also a Google Fit user, preferably have a step
        counter of some kind, and willing to spend some effort tracking
        nutrition info into one of the few nutrition apps that are adequately
        syncing data with Google Fit, I’d love to hear from you. Let me know
        below and I’ll set you up with an account and next steps.
      </p>
    </main>
  );
}
