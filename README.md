
Collection Subset
=================

Here's how it goes:
 1. You value Backbone because it gives you a model layer with business logic.
 2. Your UI is rendered from this whole master model.
 3. But in fact your widgets tend to be concerned with only parts of the data (your app isn't "todomvc").
 4. Look around and thre's if statements scattered around your views to disregard some models.
 5. Switch your Backbone.Collection:s for Subset's CollectionB instead.
 6. Later if you drift away from Backbone's View+Router stuff try to switch to Collection and bmc instead.
 7. What you got is a data structure lib that can continue to back you app through UI generations.

Summary:

Subsets Support Views, on a need-to-know basis.

We want Backbone style Collections, with change events.
While single-model (view+controller)s are trivial to maintain,
we need some layer between the collection and multi-model (view+controller)s.
Otherwise they tend to listen to events just to add to their own
internal collection that's effectively a subset.
They would have an informal relation between this subset's definition
and the attributes they add to new models in order for them to match the subset.

We also want better control (than in Backbone) of ordering.
And for other views to deal with the same data in sync we want re-order events.
A way to do that is through linked-list style references between models,
but we've found that to be a leaky abstraction to simplify persistence.

Use cases follow.

Authoring
=========

Subsets can be used to author on a particular section, i.e. under a headline.

Assuming this is a level-2 heandline, there are level-3 headlines below,
that we can manage in two ways:
 * Keep paragraphs strictly ordered
   - with the headlines in between as title paragraphs
   - or with a reference to the section id in paragraph models
 * Keep additional subsets as sub-sections
