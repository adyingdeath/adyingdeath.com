import { md, type BlogMeta } from "@/lib/blog";

export const meta: BlogMeta = {
  id: "jifuedu2lqh0",
  title: "Introducing WeSpinner: A free website where you can create and explore interesting spinning wheels.",
  summary: "Introducing WeSpinner - a free web tool for creating customizable spinning wheels. Perfect for classroom activities, decision making, and interactive events with ready-to-use templates and cross-platform accessibility.",
  date: "2025-02-09",
};

export default function post() {
  return (
    <>
      {md`
WeSpinner is a free website where you can [create](https://www.wespinner.com/) and [explore](https://www.wespinner.com/explore) interesting spinning wheels. Spinning wheels can be used in many places, such as in the classroom, at home, or in the office.
      `}

      <h2>When do you need a spinning wheel?</h2>

      {md`
When you got some options to choose from, you can use a spinning wheel to help you make a decision. There are so many use cases, like:

- Teachers can randomly select students for classroom activities
- Solve "what's for dinner" dilemmas with a food spinner
- Make quick decisions with our popular [Yes/No Wheel](https://www.wespinner.com/wheel/yes-or-no-wheel)
      `}

      <h2>Enhance Your Events with Ready-to-Use Templates</h2>

      {md`
Looking for inspiration? Explore these popular ready-to-use wheels:

WeSpinner offers versatile solutions for:
- Educators seeking dynamic classroom engagement tools
- Team leaders organizing creative brainstorming sessions
- Event hosts planning interactive activities
- Anyone needing quick decision-making assistance

Our templates include practical applications like:
- ✅ Team randomization for group projects
- ✅ Exercise routine randomization for workouts
- ✅ [Animal Generator](https://www.wespinner.com/wheel/random-animal-generator-wheel) for educational games
      `}

      <h2>Why Choose WeSpinner?</h2>

      {md`
1. **User-Friendly Customization**
   Easily tailor wheel segments with names, themes, or any text content. Create personalized wheels in minutes with our intuitive interface.

2. **Cross-Platform Accessibility**
   Access your spinning wheels anytime, anywhere — perfect for both in-person and virtual events.

   Need a random number? Our [Digital Wheel](https://www.wespinner.com/wheel/random-digit-wheel) works seamlessly on all devices.

3. **Time-Saving Solutions**
   Our ready-made templates help you:
   - Quickly set up classroom activities
   - Generate spontaneous meeting agendas

4. **Creative Freedom**
   - Share creations with the community
   - Discover community creations in our [Explore Wheels](https://www.wespinner.com/explore)

Start [creating your first wheel](https://www.wespinner.com/) today and experience how effortless decision-making can be!
      `}
    </>
  );
}
