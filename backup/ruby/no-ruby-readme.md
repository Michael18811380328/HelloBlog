# Ruby History

Ruby is a dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write

### The Ideals of Ruby’s Creator

Ruby is a language of careful balance. Its creator, Yukihiro “Matz” Matsumoto, blended parts of his favorite languages (Perl, Smalltalk, Eiffel, Ada, and Lisp) to form a new language that balanced functional programming with imperative programming.

He has often said that he is “trying to make Ruby natural, not simple,” in a way that mirrors life.

Building on this, he adds:

> Ruby is simple in appearance, but is very complex inside, just like our human body1.

### About Ruby’s Growth

Since its public release in 1995, Ruby has drawn devoted coders worldwide. In 2006, Ruby achieved mass acceptance. With active user groups formed in the world’s major cities and Ruby-related conferences filled to capacity.

Ruby-Talk, the primary mailing list for discussion of the Ruby language, climbed to an average of 200 messages per day in 2006. It has dropped in recent years as the size of the community pushed discussion from one central list into many smaller groups.

Ruby is ranked among the top 10 on most of the indices that measure the growth and popularity of programming languages worldwide (such as the TIOBE index). Much of the growth is attributed to the popularity of software written in Ruby, particularly the Ruby on Rails web framework.

Ruby is also completely free. Not only free of charge, but also free to use, copy, modify, and distribute.

### Seeing Everything as an Object

Initially, Matz looked at other languages to find an ideal syntax. Recalling his search, he said, “I wanted a scripting language that was more powerful than Perl, and more object-oriented than Python2.”

In Ruby, everything is an object. Every bit of information and code can be given their own properties and actions. Object-oriented programming calls properties by the name instance variables and actions are known as methods. Ruby’s pure object-oriented approach is most commonly demonstrated by a bit of code which applies an action to a number.

5.times { print "We _love_ Ruby -- it's outrageous!" }
In many languages, numbers and other primitive types are not objects. Ruby follows the influence of the Smalltalk language by giving methods and instance variables to all of its types. This eases one’s use of Ruby, since rules applying to objects apply to all of Ruby.

### Ruby’s Flexibility

Ruby is seen as a flexible language, since it allows its users to freely alter its parts. Essential parts of Ruby can be removed or redefined, at will. Existing parts can be added upon. Ruby tries not to restrict the coder.

For example, addition is performed with the plus (+) operator. But, if you’d rather use the readable word plus, you could add such a method to Ruby’s builtin Numeric class.

```ruby
class Numeric
  def plus(x)
    self.+(x)
  end
end

y = 5.plus 6
# y is now equal to 11
```

Ruby’s operators are syntactic sugar for methods. You can redefine them as well.

Blocks: a Truly Expressive Feature
Ruby’s block are also seen as a source of great flexibility. A programmer can attach a closure to any method, describing how that method should act. The closure is called a block and has become one of the most popular features for newcomers to Ruby from other imperative languages like PHP or Visual Basic.

Blocks are inspired by functional languages. Matz said, “in Ruby closures, I wanted to respect the Lisp culture3.”

```ruby
search_engines =
  %w[Google Yahoo MSN].map do |engine|
    "http://www." + engine.downcase + ".com"
  end
```

In the above code, the block is described inside the do ... end construct. The map method applies the block to the provided list of words. Many other methods in Ruby leave a hole open for a coder to write their own block to fill in the details of what that method should do.

### Ruby and the Mixin

Unlike many object-oriented languages, Ruby features single inheritance only, on purpose. But Ruby knows the concept of modules (called Categories in Objective-C). Modules are collections of methods.

Classes can mixin a module and receive all its methods for free. For example, any class which implements the each method can mixin the Enumerable module, which adds a pile of methods that use each for looping.

```ruby
class MyArray
  include Enumerable
end
```

Generally, Rubyists see this as a much clearer way than multiple inheritance, which is complex and can be too restrictive.

### Ruby’s Visual Appearance

While Ruby often uses very limited punctuation and usually prefers English keywords, some punctuation is used to decorate Ruby. Ruby needs no variable declarations. It uses simple naming conventions to denote the scope of variables.

```ruby
var could be a local variable.
@var is an instance variable.
$var is a global variable.
```

These sigils enhance readability by allowing the programmer to easily identify the roles of each variable. It also becomes unnecessary to use a tiresome self. prepended to every instance member.

### Beyond the Basics

Ruby has a wealth of other features, among which are the following:

Ruby has exception handling features, like Java or Python, to make it easy to handle errors.

Ruby features a true mark-and-sweep garbage collector for all Ruby objects. No need to maintain reference counts in extension libraries. As Matz says, “This is better for your health.”

Writing C extensions in Ruby is easier than in Perl or Python, with a very elegant API for calling Ruby from C. This includes calls for embedding Ruby in software, for use as a scripting language. A SWIG interface is also available.

### Ruby can load extension libraries dynamically if an OS allows.

Ruby features OS independent threading. Thus, for all platforms on which Ruby runs, you also have multithreading, regardless of if the OS supports it or not, even on MS-DOS!

Ruby is highly portable: it is developed mostly on GNU/Linux, but works on many types of UNIX, macOS, Windows, DOS, BeOS, OS/2, etc.

### Other Implementations of Ruby

Ruby, as a language, has a few different implementations. This page has been discussing the reference implementation, in the community often referred to as MRI (“Matz’s Ruby Interpreter”) or CRuby (since it is written in C), but there are also others. They are often useful in certain situations, provide extra integration to other languages or environments, or have special features that MRI doesn’t.

Here’s a list:

```markdown
JRuby is Ruby atop the JVM (Java Virtual Machine), utilizing the JVM’s optimizing JIT compilers, garbage collectors, concurrent threads, tool ecosystem, and vast collection of libraries.
Rubinius is ‘Ruby written in Ruby’. Built on top of LLVM, Rubinius sports a nifty virtual machine that other languages are being built on top of, too.
TruffleRuby is a high performance Ruby implementation on top of GraalVM.
mruby is a lightweight implementation of the Ruby language that can be linked and embedded within an application. Its development is led by Ruby’s creator Yukihiro “Matz” Matsumoto.
IronRuby is an implementation “tightly integrated with the .NET Framework”.
MagLev is “a fast, stable, Ruby implementation with integrated object persistence and distributed shared cache”.
Cardinal is a “Ruby compiler for Parrot Virtual Machine” (Perl 6).
For a more complete list, see Awesome Rubies.
```

### References

> 1 Matz, speaking on the Ruby-Talk mailing list, May 12th, 2000.
> 2 Matz, in An Interview with the Creator of Ruby, Nov. 29th, 2001.
> 3 Matz, in Blocks and Closures in Ruby, December 22nd, 2003.
