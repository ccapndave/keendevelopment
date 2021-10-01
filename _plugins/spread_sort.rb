module Jekyll
  module SpreadSortFilter
    def spread(array)
      return array unless array.is_a?(Array)

      if array.length.odd? then
        return array.map.with_index.sort {|a,b|
          case [a[1].odd?(), b[1].odd?()]
          when [true, false]
            -1
          when [false, true]
            1
          when [true, true]
            b <=> a
          when [false, false]
            a <=> b
          end
        }.map(&:first)
      else
        return array.map.with_index.sort {|a,b|
          case [a[1].odd?(), b[1].odd?()]
          when [true, false]
            1
          when [false, true]
            -1
          when [true, true]
            a <=> b
          when [false, false]
            b <=> a
          end
        }.map(&:first)	
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::SpreadSortFilter)