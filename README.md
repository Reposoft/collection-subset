
Collection Subset
=================

Support Views, on a need-to-know basis.

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
