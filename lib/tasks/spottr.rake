namespace :spottr do
  desc "Toggle all is_open true to false."
  task spots: :environment do
    Spot.all.select do |spot|
      spot.is_open == true
    end.each do |true_spot|
      true_spot.update(is_open: false)
    end
  end
end
