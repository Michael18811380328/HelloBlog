# Tips On Prioritizing Tech Debt In A Healthy Way

Table Of Contents

1. [The myth of the two backlogs](https://leadership.garden/tips-on-prioritizing-tech-debt/#the-myth-of-the-two-backlogs)
2. [Don’t make tech debt a blame game.](https://leadership.garden/tips-on-prioritizing-tech-debt/#dont-make-tech-debt-a-blame-game)
3. [How to discuss tech debt](https://leadership.garden/tips-on-prioritizing-tech-debt/#how-to-discuss-tech-debt)
4. [Prioritization techniques](https://leadership.garden/tips-on-prioritizing-tech-debt/#prioritization-techniques)
5. [Some tips on how to actually do the work](https://leadership.garden/tips-on-prioritizing-tech-debt/#some-tips-on-how-to-actually-do-the-work)
6. [Closing words](https://leadership.garden/tips-on-prioritizing-tech-debt/#closing-words)

Technical debt (a.k.a. ‘tech debt’) became a popular term in the past years. Our codebases and systems tend to build up ‘cruft’ over time, making it harder to make changes to them or build on them later.

Tech debt is a metaphor by Ward Cunningham, a co-author of the Agile Manifesto and the creator of the first wiki software. Metaphors, like models, help shape our thinking about a particular topic. So, why do we call it ‘technical debt’ and not simply ‘cruft’? The reason is that in certain aspects, it is analogous to financial debt – if we don’t pay it back, it takes its toll on new features and even maintenance, just like interest accumulates on financial debt.

One source of this is our conscious and unconscious tradeoffs when designing and building our systems, lack of clean code, documentation, and best practices. Another source is that systems and their ecosystem evolve, and what was a perfect solution two years ago isn’t so shiny anymore.

I will focus on techniques to ‘sell the idea’ and prioritize paying back tech debt in product development with multiple stakeholders at the table.



## The myth of the two backlogs

Let’s start with what not to do. Many teams end up with two kinds of backlogs – one product-focused and one tech-focused. It won’t work for multiple reasons:

- It’ll be nearly impossible to cross-prioritize items in separate backlogs against each other.
- It fuels the “us vs. them” mindset, which kills team cohesion and common goals.
- Prioritization is the job of the whole team; leaving out Product representatives won’t work.
- It makes sprint planning harder unless you have strict rules on how to allocate capacity (e.g., 20% goes to tech debt consistently)

Recognize that any type of work is … well, work. ***Keep one backlog and add any kind of work there***. Feel free to tag tech debt if you want stats or filtered views, but make sure you prioritize the whole backlog together.



## Don’t make tech debt a blame game.

Another usual mistake is to make arguments about tech debt one full of finger-pointing. I’ve seen some managers (engineering and product alike) say phrases like, “well, if you created a better solution in the first place, we wouldn’t be in this situation” – this is just stupid, inhumane, and ultimately pointless. Nothing ever will be perfect. We are humans, context changes, things evolve. Just accept it. The best we can do is learn from our design mistakes, instill good practices and get as conscious as we can about the tradeoffs we’re making.

***Playing the blame game takes our focus away from solving the issue at hand***. It makes most folks defensive, which again shifts the discussion into an unnecessary back-and-forth without getting any closer to solutions.

***Blameless retrospectives and post mortems are the way to go***. The fix is almost always systemic and not personal.



## How to discuss tech debt

Now that we know what to avoid let’s see some ways to argue about the importance of paying back technical debt. It usually comes down to the **risk** around existing tech debt, the **toil** (of maintenance) caused by it, and how it **hinders** the development of **new features**.

In my experience, most engineers don’t need to be convinced to work on technical debt. In fact, they are the ones requesting that. On the other hand, engineering and product managers often need more context to understand the importance of paying back tech debt.

Your best strategy here is to understand how to give that context in the language your stakeholders speak. “Well, it’s trivial why this is important” won’t work. There are 50 other items in your backlog which is “trivially important” to them. Also, please don’t make it about yourself. It’s great that you’re passionate about fixing this, but if it sounds like your pet project without any further argument, it likely won’t get prioritized. I’ll show you a few ways to frame your views. Spoiler: it’s all about connecting the dots from your tech debt items to your internal or external customers and the product’s performance.

### Risk

A certain percentage of technical debt work has a risk profile attached

A certain percentage of technical debt work has a risk profile attached. One trivial example is when your solution uses a 3rd party (library/service) that is getting to its end of life. The risk here is that if you don’t upgrade or migrate away to another supported solution, the systems depending on the 3rd party would either be dysfunctional or would, for example, stop receiving security patches in the future, risking a potential breach, which is obviously bad for your users or customers. Not each situation is equal, of course – it does matter whether we’d be going offline next week or there is a low chance of a low-impact security issue hitting you in 2 years. Check the ‘Cost of Delay’ section below.

Another type of risk is also around customer retention, but it’s less direct. The subpar experience caused by not great solutions (think about frequent outages and slow services) creates the risk of customer churn.

**Some examples of phrasing technical debt around risk:**

- We might fix a bug in 2 places but miss the 3rd due to code duplication.
- The design of the current system could lead to a slow user experience at higher usage scenarios.
- Lacking security practices could result in breaches and legal liabilities.
- Accidental introduction of new bugs into the feature is probable due to our lack of unit tests.
- The complexity and inflexibility of the codebase result in us saying no to new features due to long development times.

***To make your argument stronger and honest, whenever you can, gather data and make it part of the argument.*** This is not always possible, of course. Remember, data can be industry best practice, too, e.g., long test run times vs. what’s acceptable.